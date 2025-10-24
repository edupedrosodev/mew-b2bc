-- Adicionar políticas de SELECT para permitir verificação de registros existentes
CREATE POLICY "Permitir leitura pública de organizações"
  ON public.organizations
  FOR SELECT
  USING (true);

CREATE POLICY "Permitir leitura pública de funcionários"
  ON public.employees
  FOR SELECT
  USING (true);

CREATE POLICY "Permitir leitura pública de estudantes"
  ON public.students
  FOR SELECT
  USING (true);

CREATE POLICY "Permitir leitura pública de cadastros em massa"
  ON public.bulk_registrations
  FOR SELECT
  USING (true);