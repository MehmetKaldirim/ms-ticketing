// export const stripe = {
//   charges: {
//     create: jest.fn().mockResolvedValue({}),
//   },
// };

export const stripe = {
  charges: {
    create: jest.fn().mockResolvedValue({
      id: "mock_charge_id", // Add a mock id here
    }),
  },
};
