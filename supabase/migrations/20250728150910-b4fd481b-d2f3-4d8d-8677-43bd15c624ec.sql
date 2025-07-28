-- Re-enable RLS and create proper policies for kv_store table
ALTER TABLE public.kv_store_32032301 ENABLE ROW LEVEL SECURITY;

-- Create policies that allow authenticated users to access kv_store
-- This appears to be a system table, so we'll allow authenticated access
CREATE POLICY "Allow authenticated users to read kv_store" 
ON public.kv_store_32032301 
FOR SELECT 
USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to insert into kv_store" 
ON public.kv_store_32032301 
FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update kv_store" 
ON public.kv_store_32032301 
FOR UPDATE 
USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete from kv_store" 
ON public.kv_store_32032301 
FOR DELETE 
USING (auth.role() = 'authenticated');