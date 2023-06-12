import { component$, useStylesScoped$, useSignal } from '@builder.io/qwik';
import { routeLoader$, routeAction$, Form } from '@builder.io/qwik-city';
import styles from './joke.css?inline';


/*
The function passed to routeLoader$ is invoked on the server eagerly before any component is rendered and is responsible for loading data.
The routeLoader$ returns a use-hook, useDadJoke(), that can be used in the component to retrieve the server data.
*/
const useDadJoke = routeLoader$(async () => {
  const response = await fetch('https://icanhazdadjoke.com/', {
    headers: { Accept: 'application/json' },
  });
  return (await response.json()) as {
    id: string;
    status: number;
    joke: string;
  };
});

/*
we used routeLoader$ to send data from the server to the client. 
To post (send) data from the client back to the server, we use routeAction$ 
*/
const useJokeVoteAction = routeAction$((props) => {
    // Leave it as an exercise for the reader to implement this.
    console.log('VOTE', props);
});
 


export default component$(() => {
    const dadJokeSignal = useDadJoke();
    const favoriteJokeAction = useJokeVoteAction();
    const isFavoriteSignal = useSignal(false);
    useStylesScoped$(styles);
    return (
      <section class="section bright">
        <p>{dadJokeSignal.value.joke}</p>
        <Form action={favoriteJokeAction}>
          <input type="hidden" name="jokeID" value={dadJokeSignal.value.id} />
          <button name="vote" value="up">👍</button>
          <button name="vote" value="down">👎</button>
          <button
            onClick$={() => {
                isFavoriteSignal.value = !isFavoriteSignal.value;
            }}>
            { isFavoriteSignal.value ? '❤️' : '🤍' }
          </button>
        </Form>
      </section>
    );
});