declare namespace Express {
    interface Request {
      user: {
        _id: mongoose.Types.ObjectId;
        username: string;
      };
    }
  }
  