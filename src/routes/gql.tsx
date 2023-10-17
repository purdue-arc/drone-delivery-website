import {gql} from '@apollo/client/core';
import {createSubscription} from '@merged/solid-apollo'


const SUBSCRIPTION = gql`
  subscription GetCountriesStreamingSubscription {
    countries {
      id
      name
    }
  }
`;

export default function Gql() {
  const data = createSubscription(SUBSCRIPTION);

  return (
    <div style={{"padding-left": "12px"}}>{JSON.stringify(data(), null, 2)}</div>
  )
}
