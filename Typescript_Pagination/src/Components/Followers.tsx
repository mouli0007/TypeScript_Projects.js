interface PROPS {
  avatar_url: string;
  html_url: string;
  login: string;
}

const Follower = ({ avatar_url, html_url, login }: PROPS) => {
  return (
    <article className="card">
      <img src={avatar_url} alt={login} />
      <h4>{login}</h4>
      <a href={html_url} className="btn">
        View Profile
      </a>
    </article>
  );
};

export default Follower;
