import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://vunqunlyzaaorklmibxm.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1bnF1bmx5emFhb3JrbG1pYnhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzU1MDg0MTMsImV4cCI6MTk5MTA4NDQxM30.P66y6tycRkyMrxP_sBlwQDHqqFy-cH5UXosg__xpPTc"
);
