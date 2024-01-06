function mapErrors(err: any): string {
  if (err.name === "ValidationError") {
    return Object.values(err.errors)
      .map((value: { message: string }) => value.message)
      .join(", ");
  } else if (Array.isArray(err)) {
    return err.join(", ");
  } else if (typeof err === "string") {
    return err;
  } else if (err.message) {
    return mapErrors(err.message);
  } else {
    return "Something went wrong";
  }
}

export default mapErrors;
