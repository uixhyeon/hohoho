// 코드 에디터 컴포넌트 (왼쪽: 코드, 오른쪽: 메모)
import { useState, useRef, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import './CodeEditor.css';

export default function CodeEditor({ initialCode = '', initialAnnotations = [], onSave }) {
  const [code, setCode] = useState(initialCode);
  const [annotations, setAnnotations] = useState(initialAnnotations);
  const [selectedLine, setSelectedLine] = useState(null);
  const [newMemo, setNewMemo] = useState('');
  const codeEditorRef = useRef(null);

  // 코드 라인 클릭 핸들러
  const handleLineClick = (lineNumber) => {
    setSelectedLine(lineNumber);
  };

  // 메모 추가
  const handleAddMemo = () => {
    if (selectedLine !== null && newMemo.trim()) {
      const newAnnotation = {
        id: Date.now(),
        lineNumber: selectedLine,
        memo: newMemo,
        color: '#ffd700', // 기본 색상: 노란색
      };

      setAnnotations([...annotations, newAnnotation]);
      setNewMemo('');
      setSelectedLine(null);
    }
  };

  // 메모 삭제
  const handleDeleteMemo = (id) => {
    setAnnotations(annotations.filter((ann) => ann.id !== id));
  };

  // 메모 색상 변경
  const handleColorChange = (id, color) => {
    setAnnotations(
      annotations.map((ann) =>
        ann.id === id ? { ...ann, color } : ann
      )
    );
  };

  // 저장 (부모 컴포넌트로 전달)
  const handleSave = () => {
    if (onSave) {
      onSave({ code, annotations });
    }
  };

  return (
    <div className="code-editor-container">
      {/* 왼쪽: 코드 에디터 */}
      <div className="code-panel">
        <div className="panel-header">
          <h3>💻 코드</h3>
          <button onClick={handleSave} className="save-btn">
            💾 저장
          </button>
        </div>

        <CodeMirror
          value={code}
          height="calc(100vh - 150px)"
          theme={oneDark}
          extensions={[javascript({ jsx: true })]}
          onChange={(value) => setCode(value)}
          className="code-mirror"
        />

        {selectedLine !== null && (
          <div className="line-selector">
            ✏️ {selectedLine}번째 줄 선택됨
          </div>
        )}
      </div>

      {/* 중간: 연결선 (SVG) */}
      <svg className="connection-lines">
        {annotations.map((ann) => {
          const lineHeight = 24; // 대략적인 라인 높이
          const y = ann.lineNumber * lineHeight;
          return (
            <line
              key={ann.id}
              x1="0"
              y1={y}
              x2="100%"
              y2={y + 50}
              stroke={ann.color}
              strokeWidth="2"
              opacity="0.6"
            />
          );
        })}
      </svg>

      {/* 오른쪽: 메모 패널 */}
      <div className="memo-panel">
        <div className="panel-header">
          <h3>📝 메모</h3>
        </div>

        <div className="memo-list">
          {annotations.map((ann) => (
            <div
              key={ann.id}
              className="memo-item"
              style={{ borderLeft: `4px solid ${ann.color}` }}
            >
              <div className="memo-header">
                <span className="line-number">Line {ann.lineNumber}</span>
                <div className="memo-actions">
                  <input
                    type="color"
                    value={ann.color}
                    onChange={(e) => handleColorChange(ann.id, e.target.value)}
                    title="메모 색상 변경"
                  />
                  <button
                    onClick={() => handleDeleteMemo(ann.id)}
                    className="delete-btn"
                  >
                    🗑️
                  </button>
                </div>
              </div>
              <p className="memo-content">{ann.memo}</p>
            </div>
          ))}
        </div>

        {/* 메모 추가 폼 */}
        <div className="add-memo-form">
          <h4>새 메모 추가</h4>
          <p className="hint">
            왼쪽 코드에서 라인을 클릭하고 메모를 입력하세요
          </p>

          <textarea
            value={newMemo}
            onChange={(e) => setNewMemo(e.target.value)}
            placeholder="메모 내용을 입력하세요..."
            disabled={selectedLine === null}
            rows="4"
          />

          <button
            onClick={handleAddMemo}
            disabled={selectedLine === null || !newMemo.trim()}
            className="add-btn"
          >
            ➕ 메모 추가
          </button>
        </div>
      </div>
    </div>
  );
}
