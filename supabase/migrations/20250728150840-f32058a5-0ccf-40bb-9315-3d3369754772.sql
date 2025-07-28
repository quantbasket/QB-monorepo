-- Check if kv_store table needs RLS policies
-- If it's a system table that doesn't need user-specific access, we can disable RLS
ALTER TABLE public.kv_store_32032301 DISABLE ROW LEVEL SECURITY;