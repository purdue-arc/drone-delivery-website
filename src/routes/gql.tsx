import {createSubscription} from '@merged/solid-apollo'
import {graphql} from "~/gql";


const SUBSCRIPTION = graphql(`
  subscription GetCountriesStreamingSubscription {
    countries {
      id
      name
    }
  }
`);

export default function Gql() {
  const data = createSubscription(SUBSCRIPTION);
  // Note: if you try to console.log data() here, will only print undefined, but it's working

  return (
    <div style={{"padding-left": "12px"}}>{JSON.stringify(data(), null, 2)}</div>
  )
}
