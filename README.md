# Demonstration of Firebase `Unknown node type` Error

## Behaviour

When firebase initialization logic is seperated into a seperate package, and imported, an error occurs with realtime database listeners. This issue as far as i know **_only_** occurs with the realtime database listeners ie. `onChildAdded`, `onValue`, and doesnt occur with eg. `get`. Additionally, it only occurs when seperated, built, and imported. If i define it directly in the nextjs app, it works as expected. Furthermore, _again_, this only occurs when I have 2 conditions on the query, eg. `limitToFirst(5)` AND `orderByChild("updatedAt")`, if only one is present, the error is not triggered (although there is another weird issue if only limitToFirst is set, then onChildRemoved is triggered immediately after onChildAdded, even though it shouldnt be, but regardless, this is less important).

## Steps to reproduce

1. Clone the repo
2. `npm install`
3. `npm run build:functions`
4. `npm run build:deps`
5. `npm run dev`
6. Open `http://localhost:3000`.
7. Click `Add Data!`
8. Error `Error: Firebase Database (${JSCORE_VERSION}) INTERNAL ASSERT FAILED: Unknown node type` should occur.
9. Experience pain...

Note in `./src/pages/index.tsx` we are importing `import { initializeFirebase } from "../../deps/build/firebase"`. if this is changed to `import { initializeFirebase } from "../../deps/firebase"`, the error disapeers, and we fetch the data as expected.

## Context

This is a reproduced example. My actual app requires that the firebase logic is seperated into a seperate package, because I use the package as an API for multiple other clients (eg. a cli). I would much rather not just duplicate the initialization logic into my nextjs app, and there would also be other side effects.
