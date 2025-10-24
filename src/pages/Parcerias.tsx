import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Upload, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const formSchema = z.object({
  // Dados da Organização
  organizationName: z.string().min(2, {
    message: "Nome da organização deve ter pelo menos 2 caracteres.",
  }).max(200, {
    message: "Nome da organização deve ter no máximo 200 caracteres.",
  }),
  cnpj: z.string().regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, {
    message: "CNPJ inválido. Formato esperado: 00.000.000/0000-00",
  }),
  
  // Dados do Funcionário
  employeeName: z.string().min(2, {
    message: "Nome deve ter pelo menos 2 caracteres.",
  }).max(200, {
    message: "Nome deve ter no máximo 200 caracteres.",
  }),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
    message: "CPF inválido. Formato esperado: 000.000.000-00",
  }),
  phone: z.string().min(10, {
    message: "Telefone deve ter pelo menos 10 dígitos.",
  }).max(20, {
    message: "Telefone deve ter no máximo 20 caracteres.",
  }),
  email: z.string().email({
    message: "E-mail inválido.",
  }).max(255, {
    message: "E-mail deve ter no máximo 255 caracteres.",
  }),
  relationship: z.string().min(1, {
    message: "Por favor, selecione a relação com o estudante.",
  }),
  
  // Dados do Estudante
  studentName: z.string().min(2, {
    message: "Nome do estudante deve ter pelo menos 2 caracteres.",
  }).max(200, {
    message: "Nome do estudante deve ter no máximo 200 caracteres.",
  }),
  birthDate: z.string().min(1, {
    message: "Data de nascimento é obrigatória.",
  }),
  currentGrade: z.string().min(1, {
    message: "Série atual é obrigatória.",
  }),
});

const bulkFormSchema = z.object({
  organizationName: z.string().min(2, {
    message: "Nome da organização deve ter pelo menos 2 caracteres.",
  }),
  cnpj: z.string().regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, {
    message: "CNPJ inválido. Formato esperado: 00.000.000/0000-00",
  }),
  phone: z.string().min(10, {
    message: "Telefone deve ter pelo menos 10 dígitos.",
  }),
  email: z.string().email({
    message: "E-mail inválido.",
  }),
  file: z.instanceof(File, {
    message: "Por favor, faça upload do arquivo.",
  }),
});

const Parcerias = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      organizationName: "",
      cnpj: "",
      employeeName: "",
      cpf: "",
      phone: "",
      email: "",
      relationship: "",
      studentName: "",
      birthDate: "",
      currentGrade: "",
    },
  });

  const bulkForm = useForm<z.infer<typeof bulkFormSchema>>({
    resolver: zodResolver(bulkFormSchema),
    defaultValues: {
      organizationName: "",
      cnpj: "",
      phone: "",
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log('Iniciando cadastro individual:', values);

      // Buscar ou criar organização
      const { data: existingOrg } = await supabase
        .from('organizations')
        .select('id')
        .eq('cnpj', values.cnpj)
        .maybeSingle();

      let organizationId: string;

      if (existingOrg) {
        organizationId = existingOrg.id;
        console.log('Organização existente encontrada:', organizationId);
      } else {
        const { data: newOrg, error: orgError } = await supabase
          .from('organizations')
          .insert({
            cnpj: values.cnpj,
            name: values.organizationName,
          })
          .select('id')
          .single();

        if (orgError) throw orgError;
        organizationId = newOrg.id;
        console.log('Nova organização criada:', organizationId);
      }

      // Criar funcionário
      const { data: employee, error: employeeError } = await supabase
        .from('employees')
        .insert({
          organization_id: organizationId,
          name: values.employeeName,
          cpf: values.cpf,
          phone: values.phone,
          email: values.email,
          relationship: values.relationship,
        })
        .select('id')
        .single();

      if (employeeError) throw employeeError;
      console.log('Funcionário criado:', employee.id);

      // Criar estudante
      const { error: studentError } = await supabase
        .from('students')
        .insert({
          employee_id: employee.id,
          name: values.studentName,
          birth_date: values.birthDate,
          current_grade: values.currentGrade,
        });

      if (studentError) throw studentError;
      console.log('Estudante criado com sucesso');

      toast({
        title: "Cadastro enviado com sucesso!",
        description: "Entraremos em contato em breve.",
      });
      form.reset();
    } catch (error: any) {
      console.error('Erro ao salvar cadastro:', error);
      toast({
        title: "Erro ao enviar cadastro",
        description: error.message || "Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  }

  async function onBulkSubmit(values: z.infer<typeof bulkFormSchema>) {
    try {
      console.log('Iniciando cadastro em massa:', values);

      if (!selectedFile) {
        throw new Error('Nenhum arquivo selecionado');
      }

      // Upload do arquivo (nomeado pelo CNPJ para não depender do ID da organização)
      const sanitizedCnpj = values.cnpj.replace(/\D/g, '');
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${sanitizedCnpj || 'org'}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('bulk-registrations')
        .upload(filePath, selectedFile);

      if (uploadError) throw uploadError;
      console.log('Arquivo enviado:', filePath);

      // Obter URL pública do arquivo
      const { data: { publicUrl } } = supabase.storage
        .from('bulk-registrations')
        .getPublicUrl(filePath);

      // Processar no backend com permissões elevadas (cria org + registro e envia e-mails)
      const { data: fnData, error: fnError } = await supabase.functions.invoke(
        'process-bulk-registration',
        {
          body: {
            organizationName: values.organizationName,
            cnpj: values.cnpj,
            phone: values.phone,
            email: values.email,
            fileName: selectedFile.name,
            fileUrl: publicUrl,
          },
        }
      );

      if (fnError) throw fnError;
      console.log('Processamento concluído:', fnData);

      toast({
        title: "Cadastro em massa enviado com sucesso!",
        description: "Processaremos os dados e entraremos em contato em breve.",
      });
      bulkForm.reset();
      setSelectedFile(null);
      setIsDialogOpen(false);
    } catch (error: any) {
      console.error('Erro ao processar cadastro em massa:', error);
      toast({
        title: "Erro ao enviar cadastro",
        description: error.message || "Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      bulkForm.setValue("file", file);
    }
  };

  const handleDownloadTemplate = () => {
    window.open(
      "https://docs.google.com/spreadsheets/d/1ssvo6oJZIM5_SzdFdSSA4SbU3jPbCu8r1vfta0SShtI/export?format=xlsx",
      "_blank"
    );
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-24 bg-muted/30">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Seja nosso Parceiro
</h1>

<p className="text-xl text-muted-foreground max-w-3xl mx-auto">
  Para escolas de ensino Público e Privado.
</p>
<br></br>
<p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-4">
  <strong>Para um cadastro simples, preencha o formulário abaixo e nos envie. <p>Agora se deseja cadastar uma Rede de Ensino ou um alto volume de alunos de uma só vez, siga os seguintes passos:</p></strong>
</p>

<ol className="list-decimal list-inside text-lg text-muted-foreground max-w-3xl mx-auto pl-5 mt-4 space-y-2 text-left">
  <li>Clique no botão <strong>'Cadastrar em Massa'</strong> logo abaixo.</li>
  <li>Baixe a planilha modelo.</li>
  <li>Preencha a planilha com os dados para o registro dos logins.</li>
  <li>Realize o upload da planilha para o documento seja anexado.</li>
  <li>Envie os dados preenchidos clicando no botão <strong>'Enviar cadastro em massa'</strong>.</li>
</ol>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="bg-background rounded-lg shadow-lg p-8 md:p-12"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Dados da Organização */}
                <div>
                  <h2 className="text-2xl font-heading font-bold mb-6">
                    Dados da Escola ou Rede Ensino
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="organizationName"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Nome da empresa/instituição *</FormLabel>
                          <FormControl>
                            <Input placeholder="Nome da organização" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="cnpj"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CNPJ *</FormLabel>
                          <FormControl>
                            <Input placeholder="00.000.000/0000-00" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Dados do Responsável pela implantação */}
                <div>
                  <h2 className="text-2xl font-heading font-bold mb-6">
                    Dados do Responsável pela implantação
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="employeeName"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Nome completo *</FormLabel>
                          <FormControl>
                            <Input placeholder="Nome completo" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="cpf"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CPF *</FormLabel>
                          <FormControl>
                            <Input placeholder="000.000.000-00" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefone *</FormLabel>
                          <FormControl>
                            <Input placeholder="(00) 00000-0000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>E-mail *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="email@exemplo.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="relationship"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Seu Cargo na Instituição *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="pai">CEO</SelectItem>
                              <SelectItem value="mae">DIRETOR</SelectItem>
                              <SelectItem value="responsavel">GESTOR</SelectItem>
                              <SelectItem value="padrinho">COORDENADOR</SelectItem>
                              <SelectItem value="padrinho">PROFESSOR</SelectItem>
                              <SelectItem value="padrinho">COLABORADOR</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button type="submit" size="lg" className="rounded-full">
                    Enviar Cadastro
                  </Button>
                  {/* --- ADIÇÃO DO TEXTO LGPD/TERMOS --- */}
<p className="text-xs text-muted-foreground text-center sm:text-left">
  Ao clicar em "Enviar Cadastro", você concorda com nossos <a href="/termos-de-uso" className="underline hover:text-primary">Termos de Uso</a> e <a href="/politica-de-privacidade" className="underline hover:text-primary">Política de Privacidade (LGPD)</a>.
</p>
{/* --- FIM DA ADIÇÃO --- */}
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button type="button" variant="outline" size="lg" className="rounded-full">
                        <Upload className="mr-2 h-4 w-4" />
                        Cadastrar em Massa
                      </Button>
                    </DialogTrigger>
                    <DialogContent 
                      className="max-w-2xl max-h-[90vh] overflow-y-auto"
                      onInteractOutside={() => setIsDialogOpen(false)}
                    >
                      <DialogHeader>
                        <DialogTitle className="text-2xl">Cadastro em Massa</DialogTitle>
                        <DialogDescription className="text-base">
                          Cadastre múltiplos estudantes de uma vez usando nossa planilha modelo.
                        </DialogDescription>
                      </DialogHeader>
                      
                      <Form {...bulkForm}>
                        <form onSubmit={bulkForm.handleSubmit(onBulkSubmit)} className="space-y-6">
                          {/* Dados da Organização */}
                          <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Dados da Organização</h3>
                            
                            <FormField
                              control={bulkForm.control}
                              name="organizationName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Nome da empresa/instituição *</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Nome da organização" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <FormField
                                control={bulkForm.control}
                                name="cnpj"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>CNPJ *</FormLabel>
                                    <FormControl>
                                      <Input placeholder="00.000.000/0000-00" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={bulkForm.control}
                                name="phone"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Telefone do decisor *</FormLabel>
                                    <FormControl>
                                      <Input placeholder="(00) 00000-0000" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            
                            <FormField
                              control={bulkForm.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>E-mail *</FormLabel>
                                  <FormControl>
                                    <Input type="email" placeholder="email@exemplo.com" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          {/* Download do Modelo */}
                          <Card className="border-2 border-dashed">
                            <CardContent className="pt-6">
                              <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                  <div className="bg-primary/10 p-2 rounded-full">
                                    <Download className="h-5 w-5 text-primary" />
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="font-semibold mb-1">Passo 1: Baixe o modelo</h4>
                                    <p className="text-sm text-muted-foreground mb-3">
                                      Baixe nossa planilha modelo e preencha com os dados dos estudantes.
                                    </p>
                                    <Button
                                      type="button"
                                      variant="outline"
                                      onClick={handleDownloadTemplate}
                                      className="w-full sm:w-auto"
                                    >
                                      <Download className="mr-2 h-4 w-4" />
                                      Baixar Modelo de Cadastro
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          {/* Upload do Arquivo */}
                          <Card className="border-2 border-dashed">
                            <CardContent className="pt-6">
                              <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                  <div className="bg-primary/10 p-2 rounded-full">
                                    <Upload className="h-5 w-5 text-primary" />
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="font-semibold mb-1">Passo 2: Envie a planilha preenchida</h4>
                                    <p className="text-sm text-muted-foreground mb-3">
                                      Após preencher, faça o upload do arquivo Excel (.xlsx) com os dados.
                                    </p>
                                    <FormField
                                      control={bulkForm.control}
                                      name="file"
                                      render={({ field: { value, onChange, ...field } }) => (
                                        <FormItem>
                                          <FormControl>
                                            <div className="space-y-2">
                                              <Input
                                                type="file"
                                                accept=".xlsx,.xls"
                                                onChange={handleFileChange}
                                                {...field}
                                              />
                                              {selectedFile && (
                                                <p className="text-sm text-muted-foreground">
                                                  Arquivo selecionado: {selectedFile.name}
                                                </p>
                                              )}
                                            </div>
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          {/* Aviso LGPD */}
                          <div className="bg-muted/50 border border-border rounded-lg p-4">
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              <strong className="text-foreground">Proteção de Dados:</strong> Ao enviar este cadastro, você declara ter obtido o consentimento expresso dos responsáveis pelos estudantes para o tratamento dos dados pessoais fornecidos, em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018). Os dados serão utilizados exclusivamente para fins educacionais e gestão da plataforma Me Explica Web.
                            </p>
                          </div>

                          <Button type="submit" size="lg" className="w-full rounded-full">
                            Enviar Cadastro em Massa
                          </Button>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>
                </div>
              </form>
            </Form>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Parcerias;
