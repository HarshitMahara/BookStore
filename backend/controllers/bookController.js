import { bookModel } from "../models/bookModel.js";
import { StatusCodes } from "http-status-codes";

export const getAllBooks = async (req, res) => {
  const books = await bookModel.find();
  res.status(StatusCodes.OK).json({ length: books.length, data: books });
};

export const addBook = async (req, res) => {
  try {
    await bookModel.create(req.body);
    res.status(StatusCodes.OK).json({ msg: "Book Added Successfully" });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Error in the Server" });
  }
};

export const getBook = async (req, res) => {
  const id = req.param("id");
  const book = await bookModel.findById(id);
  if (book) return res.status(StatusCodes.OK).json({ book, msg: "Book Found" });
  return res
    .status(StatusCodes.NOT_FOUND)
    .json({ msg: `No Book Found with id ${id}` });
};

export const updateBook = async (req, res) => {
  try {
    const id = req.param("id");
    const book = await bookModel.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const removeBook = async (req, res) => {
  try {
    const id = req.param("id");
    //const book = await bookModel.findByIdAndDelete(id);
    const book = await bookModel.deleteOne({ _id: id });
    if (book.deletedCount)
      return res
        .status(StatusCodes.OK)
        .json({ msg: "Book Deleted Successufully", book });
    res.status(404).json({ msg: `Book with id ${id} is not found` });
  } catch (error) {
    res.status(500).json({ error });
  }
};
