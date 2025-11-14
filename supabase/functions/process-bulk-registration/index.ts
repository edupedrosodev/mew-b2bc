import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface BulkRegistrationRequest {
  organizationName: string;
  cnpj: string;
  phone: string;
  email: string;
  fileName: string;
  fileUrl: string;
}

const SUPABASE_URL = Deno.env.get('https://pfkrhjuohqqmvcmcrzmp.supabase.co') as string;
const SERVICE_ROLE_KEY = Deno.env.get('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBma3JoanVvaHFxbXZjbWNyem1wIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTA3NzQ4MSwiZXhwIjoyMDc2NjUzNDgxfQ.gUd3gqTkbPt98aM0jbnBiPtsVQoLR7rYpjc-ofFNnck') as string;
const RESEND_API_KEY = Deno.env.get('re_4b5HR4Hy_2dTkrUrmjVSXo8SfRBsqofNM') as string;

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidCNPJ(cnpj: string) {
  return /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(cnpj);
}

serve(async (req) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: BulkRegistrationRequest = await req.json();
    console.log('Processando cadastro em massa:', data);

    if (!RESEND_API_KEY) throw new Error('RESEND_API_KEY não configurada');

    // Validação básica
    if (!data.organizationName || data.organizationName.trim().length < 2) {
      throw new Error('Nome da organização inválido');
    }
    if (!isValidCNPJ(data.cnpj)) {
      throw new Error('CNPJ inválido. Formato esperado: 00.000.000/0000-00');
    }
    if (!isValidEmail(data.email)) {
      throw new Error('E-mail inválido');
    }
    if (!data.fileUrl) {
      throw new Error('URL do arquivo é obrigatória');
    }

    // 1) Buscar ou criar organização (usando service role)
    const { data: existingOrg, error: findOrgError } = await supabase
      .from('organizations')
      .select('id')
      .eq('cnpj', data.cnpj)
      .maybeSingle();

    if (findOrgError) throw findOrgError;

    let organizationId: string;

    if (existingOrg) {
      organizationId = existingOrg.id;
      console.log('Organização já existe:', organizationId);
    } else {
      const { data: newOrg, error: orgInsertError } = await supabase
        .from('organizations')
        .insert({ name: data.organizationName, cnpj: data.cnpj })
        .select('id')
        .single();
      if (orgInsertError) throw orgInsertError;
      organizationId = newOrg.id;
      console.log('Organização criada:', organizationId);
    }

    // 2) Registrar a solicitação de cadastro em massa
    const { error: bulkInsertError } = await supabase
      .from('bulk_registrations')
      .insert({
        organization_id: organizationId,
        contact_email: data.email,
        contact_phone: data.phone,
        file_url: data.fileUrl,
        status: 'pending',
      });
    if (bulkInsertError) throw bulkInsertError;

    // 3) Enviar e-mails (confirmação para org e com anexo para admin)
    const confirmationEmailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Me Explica Web <onboarding@resend.dev>',
        to: [data.email],
        subject: 'Cadastro em Massa Recebido - Me Explica Web',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #2563eb;">Cadastro em Massa Recebido!</h1>
            <p>Olá, ${data.organizationName}!</p>
            <p>Recebemos seu cadastro em massa com sucesso. Aqui estão os detalhes:</p>
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Organização:</strong> ${data.organizationName}</p>
              <p><strong>CNPJ:</strong> ${data.cnpj}</p>
              <p><strong>Telefone:</strong> ${data.phone}</p>
              <p><strong>Arquivo:</strong> ${data.fileName}</p>
            </div>
            <p>Entraremos em contato em breve para processar os dados enviados.</p>
            <p>Agradecemos pela parceria!</p>
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 14px;">
                Equipe Me Explica Web<br/>
                Construindo um movimento de equidade na educação através de ESG
              </p>
            </div>
          </div>
        `,
      }),
    });

    const confirmationEmail = await confirmationEmailResponse.json();
    console.log('E-mail de confirmação enviado:', confirmationEmail);

    // Anexo para admin
    const fileResponse = await fetch(data.fileUrl);
    if (!fileResponse.ok) {
      throw new Error(`Falha ao baixar arquivo para anexo: ${fileResponse.status}`);
    }
    const fileBlob = await fileResponse.blob();
    const fileBuffer = await fileBlob.arrayBuffer();
    const fileBase64 = btoa(String.fromCharCode(...new Uint8Array(fileBuffer)));

    const adminEmailWithAttachmentResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Me Explica Web <onboarding@resend.dev>',
        to: ['diagnostico@meexplicaweb.com.br'],
        subject: `Novo Cadastro em Massa - ${data.organizationName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #2563eb;">Novo Cadastro em Massa Recebido</h1>
            <h2>Dados da Organização:</h2>
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Nome:</strong> ${data.organizationName}</p>
              <p><strong>CNPJ:</strong> ${data.cnpj}</p>
              <p><strong>Telefone:</strong> ${data.phone}</p>
              <p><strong>E-mail:</strong> ${data.email}</p>
              <p><strong>Arquivo:</strong> ${data.fileName}</p>
            </div>
            <h2>Próximos Passos:</h2>
            <ol>
              <li>Baixar o arquivo anexo neste e-mail</li>
              <li>Validar os dados da planilha</li>
              <li>Entrar em contato com a organização</li>
            </ol>
            <p style="margin-top: 30px; color: #6b7280;">
              O arquivo foi anexado a este e-mail para sua conveniência.
            </p>
          </div>
        `,
        attachments: [
          {
            filename: data.fileName,
            content: fileBase64,
          },
        ],
      }),
    });

    const adminEmail = await adminEmailWithAttachmentResponse.json();
    console.log('E-mail admin enviado com anexo:', adminEmail);

    return new Response(
      JSON.stringify({ success: true, organizationId }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 },
    );
  } catch (error: any) {
    console.error('Erro ao processar cadastro em massa:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Erro desconhecido' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 },
    );
  }
});
