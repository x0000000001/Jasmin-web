# Import typescript types

```console
sudo systemctl start docker
npx supabase start
npx supabase gen types typescript --local > lib/database.types.ts
```

## Docker fix

<https://stackoverflow.com/questions/48957195/how-to-fix-docker-got-permission-denied-issue> \

```console
sudo chmod 666 /var/run/docker.sock
```
