import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, logout } = useAuth();

  if (!user) return <p className="text-center mt-10">Not logged in</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Profile</h2>

      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>

      <button
        onClick={logout}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}
