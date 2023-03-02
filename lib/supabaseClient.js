import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://dduknqvyoeruztfvcfra.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRkdWtucXZ5b2VydXp0ZnZjZnJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzc1OTkzODMsImV4cCI6MTk5MzE3NTM4M30.nE0wymWD2TZ_6ciGYWjFg-z1h521qn8FzoKMUKVQc0Q"
);
