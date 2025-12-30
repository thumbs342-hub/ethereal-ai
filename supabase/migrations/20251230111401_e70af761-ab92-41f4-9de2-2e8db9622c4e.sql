-- Make forge-results bucket private
UPDATE storage.buckets SET public = false WHERE id = 'forge-results';