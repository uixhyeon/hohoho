import ArchiveCard from './ArchiveCard';
import '../styles/ArchiveList.scss';

function ArchiveList({ archives, onEdit, onDelete }) {
  if (archives.length === 0) {
    return (
      <div className="empty-state">
        <p>아카이브가 없습니다.</p>
        <p>새 아카이브를 추가해보세요!</p>
      </div>
    );
  }

  return (
    <div className="archive-list">
      {archives.map(archive => (
        <ArchiveCard
          key={archive.id}
          archive={archive}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default ArchiveList;
