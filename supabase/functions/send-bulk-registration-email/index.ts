import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface BulkRegistrationData {
  organizationName: string;
  cnpj: string;
  phone: string;
  email: string;
  fileName: string;
  fileUrl: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: BulkRegistrationData = await req.json();
    console.log('Enviando e-mail de cadastro em massa:', data);

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');

    // E-mail para a organização confirmando recebimento
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

    // Buscar o arquivo do Storage para anexar no e-mail do admin
    const fileResponse = await fetch(data.fileUrl);
    const fileBlob = await fileResponse.blob();
    const fileBuffer = await fileBlob.arrayBuffer();
    const fileBase64 = btoa(String.fromCharCode(...new Uint8Array(fileBuffer)));

    // E-mail para o admin com o arquivo anexado
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
          }
        ]
      }),
    });

    const adminEmail = await adminEmailWithAttachmentResponse.json();
    console.log('E-mail admin enviado com anexo:', adminEmail);

    return new Response(
      JSON.stringify({ 
        success: true, 
        confirmationId: confirmationEmail.id,
        adminEmailId: adminEmail.id
      }), 
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error: any) {
    console.error('Erro ao enviar e-mail:', error);
    return new Response(
      JSON.stringify({ error: error.message }), 
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
