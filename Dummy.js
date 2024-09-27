const db = require("../models");

//import Review from "models/review";

const resolvers = {
  Query: {
    getBooks: async () => {
      //   const { id } = params;

      //   let WhereCondition = {};

      //   if (id && id != 0) {
      //     WhereCondition.id =  id ;
      //   }
      return await db.Book.findAll({
        include: { model: db.Review, as: "reviews" },
        //where: { ...WhereCondition },
      });
    },

    getBook: async (_, { id }) => {
      return await db.Book.findByPk(id, {
        include: { model: db.Review, as: "reviews" }, // Fetch book with its reviews
      });
    },
  },
  Mutation: {
    createBook: async (_, { input }) => {
      return await db.Book.create(input);
    },
    createReview: async (_, { input }) => {
      return await db.Review.create(input);
    },
  },

  //   Book: {
  //     review: async (parent) => {
  //       const data = await db.Review.findAll({
  //         where: { bookId: parent.id },
  //       });

  //       console.log(data, "------------------------->");
  //       return data || []; //where: {bookId: parent.id}}
  //     },
  //   },
};

module.exports = resolvers;