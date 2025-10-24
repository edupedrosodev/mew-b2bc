-- Criar bucket de storage para arquivos de cadastro em massa
INSERT INTO storage.buckets (id, name, public) 
VALUES ('bulk-registrations', 'bulk-registrations', false);

-- Política para permitir upload público
CREATE POLICY "Permitir upload de arquivos de cadastro"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'bulk-registrations');

-- Política para permitir leitura de arquivos (necessário para processar)
CREATE POLICY "Permitir leitura de arquivos de cadastro"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'bulk-registrations');