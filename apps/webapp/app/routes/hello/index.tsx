import type { MetaFunction, LoaderFunction } from 'remix';
import { useLoaderData, json, Link } from 'remix';

type HelloPageData = {
  messages: Array<{ name: string; message: string }>;
};

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export let loader: LoaderFunction = () => {
  let data: HelloPageData = {
    messages: [{name: 'hello', message: 'Hello DJ, welcome to Remix!'}]
  };

  // https://remix.run/api/remix#json
  return json(data);
};

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: 'Hello Page',
    description: 'Hello Remix!!',
    "og:image":"https://avatars.githubusercontent.com/u/64235328?s=200&v=4"
  };
};

// https://remix.run/guides/routing#index-routes
export default function HelloPage() {
  let data = useLoaderData<HelloPageData>();
  const helloMessage = data?.messages.find(message => message.name === 'hello');

  if(!helloMessage){
    return (
      <div>
        <main>
          <h2>Sorry, no message was found!</h2>
        </main>      
      </div>
    );
  }

  return (
    <div>
      <main>
        <h2>{helloMessage.message}</h2>
      </main>      
    </div>
  );
}
