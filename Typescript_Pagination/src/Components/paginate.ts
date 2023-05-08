const paginate = (followers: any[]): any[] => {
  const itemsPerPage: number = 10;
  const page: number = Math.ceil(followers.length / itemsPerPage);

  // Creating Array of Arrays !
  // Array.from()

  const newFollowers = Array.from({ length: page }, (_, index: number) => {
    const start = index * itemsPerPage;

    return followers.slice(start, start + itemsPerPage);
  });

  return newFollowers;
};

export default paginate;
