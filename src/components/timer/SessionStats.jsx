
const SessionStats = ({ completedSessions }) => {
  return (
    <div className="mt-6 text-center text-sm text-gray-600">
      ✅ Completed Sessions: <span className="font-semibold">{completedSessions}</span>
    </div>
  );
};

export default SessionStats;
