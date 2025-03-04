function UserCard({ user }) {
  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <h6 className="card-title fw-bold">User Data</h6>
        <p className="card-text">Email: {user.email}</p>
      </div>
    </div>
  );
}

export default UserCard;
