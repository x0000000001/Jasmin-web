# Import typescript types

```console
supabase start
supabase gen types typescript --local > lib/database.types.ts
```

## Docker fix

<https://stackoverflow.com/questions/48957195/how-to-fix-docker-got-permission-denied-issue> \

```console
sudo chmod 666 /var/run/docker.sock
```
