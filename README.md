# heroku-client
heroku developer api client with typescript support

## TODO
* handle heroku cache 
* handle lists
* ~~handle Rate-limit~~
* ~~handle metrics requests~~

## createClient
```typescript
    import { createClient } from '@youri-kane/heroku-client';

    const client = createClient({
        token: AUTH_TOKEN, // will thro if missing
    });
```

## Making Requests
```typescript
    import { createClient } from '@youri-kane/heroku-client';

    const client = createClient({
        token: AUTH_TOKEN,
    });

    const apps = await client.getApps({}) // types as App[]
```

## Making Poll Requests
```typescript
    import { createClient, createPollRequest } from '@youri-kane/heroku-client';

    const client = createClient({
        token: AUTH_TOKEN,
    });

    /** */
    const emitter = await createPollRequest({}, client.getApps, 5000);

    emitter.on("data", (apps: App[]) => {
        console.log(apps)
    })

    emitter.on("error", (error: Error) => {
        console.error(error)
    })

    emitter.close();
```