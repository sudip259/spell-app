import service from "../";
// query: (args) // args => {identifier, params, data}
const spellApi = service.nepApi.injectEndpoints({
  endpoints: (build) => ({
    spell: build.query({
      query: () => ({
        url: `/spells`,
        method: "GET",
      }),
    }),
    getSpellDetails: build.query({
      query: ({ params }) => ({
        url: `/spells/${params.index}`,
        method: "GET",
      }),
    }),
    addWatchLater: build.mutation({
      query: ({ data }) => ({
        url: `/login`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSpellQuery, useGetSpellDetailsQuery } = spellApi;
