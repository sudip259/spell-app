import service from "../";
// inject wishList endpoints with REACT_APP_BASE_URL env
const spellApi = service.spellApi.injectEndpoints({
  endpoints: (build) => ({
    // useSpellQuery
    spell: build.query({
      query: () => ({
        url: `/spells`,
        method: "GET",
      }),
    }),
    // useGetSpellDetailsQuery
    getSpellDetails: build.query({
      query: ({ params }) => ({
        url: `/spells/${params.index}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useSpellQuery, useGetSpellDetailsQuery } = spellApi;
