const db = require("../models");

const resolvers = {
  Query: {
    getBooks: async () => {
      return await db.Book.findAll({
        include: { model: db.Review, as: "reviews" },
      });
    },

    getBook: async (_, { id }) => {
      return await db.Book.findByPk(id, {
        include: { model: db.Review, as: "reviews" },
      });
    },
  },
  Mutation: {
    createBook: async (_, { input }) => {
      console.log(input, "********************");
      const { reviews, ...bookData } = input;
      //--------------------------------------------***************************
      const MultipleReviews = Array.isArray(reviews)
        ? reviews.map((item) => ({
            rating: item.rating,
            comment: item.comment,
          }))
        : [];
      //---------------------------------------------*********
      return await db.Book.create(
        {
          ...bookData,
          reviews: MultipleReviews, //----------MultipleReviews this logic is used to take multiple reviws
        },
        {
          include: [{ model: db.Review, as: "reviews" }],
        }
      );
    },
    createReview: async (_, { input }) => {
      return await db.Review.create(input);
    },

    updateBook: async (_, { id, input }) => {
      try {
        const book = await db.Book.findByPk(id);
        if (!book) {
          throw new error("Book not found");
        }
        await book.update({
          title: input.title,
          author: input.author,
          description: input.description,
          price: input.price,
          publisher: input.publisher,
          edition: input.edition,
        });

        //---------if we want handle multiple reviews
        if (input.reviews && input.reviews.length > 0) {
          const reviewPromises = input.reviews.map((reviewInput) =>
            db.Review.create({
              rating: reviewInput.rating,
              comment: reviewInput.comment,
              bookId: book.id, 
            })
          );

          await Promise.all(reviewPromises); //----------- Wait for all reviews to be created
        }

        return book;
      } catch (error) {
        throw new Error(`Failed to update book: ${error.message}`);
      }
    },
    deleteBook: async (_, { id }) => {
      try {
        const book = await db.Book.findByPk(id);
        if (!book) {
          throw new error("Book not found");
        }

        await db.Review.destroy({ where: { bookId: id } });
        await book.destroy();
        return { message: "Book deleted successfully", deletedBookId: id };
      } catch (error) {
        throw new Error(`Failed to delete book: ${error.message}`);
      }
    },
  },
};

module.exports = resolvers;
