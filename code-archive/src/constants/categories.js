export const CATEGORIES = [
  // 실용 코드 (10개)
  { id: 'components', name: 'Components', type: 'code' },
  { id: 'hooks', name: 'Hooks', type: 'code' },
  { id: 'utils', name: 'Utils', type: 'code' },
  { id: 'api', name: 'API/Services', type: 'code' },
  { id: 'styles', name: 'Styles/CSS', type: 'code' },
  { id: 'animations', name: 'Animations', type: 'code' },
  { id: 'forms', name: 'Forms', type: 'code' },
  { id: 'state', name: 'State Management', type: 'code' },
  { id: 'patterns', name: 'Patterns', type: 'code' },
  { id: 'snippets', name: 'Snippets', type: 'code' },

  // 개념 정리 (16개)
  { id: 'javascript', name: 'JavaScript', type: 'concept' },
  { id: 'typescript', name: 'TypeScript', type: 'concept' },
  { id: 'html', name: 'HTML', type: 'concept' },
  { id: 'css', name: 'CSS', type: 'concept' },
  { id: 'react', name: 'React', type: 'concept' },
  { id: 'vue', name: 'Vue', type: 'concept' },
  { id: 'nextjs', name: 'Next.js', type: 'concept' },
  { id: 'algorithm', name: '알고리즘', type: 'concept' },
  { id: 'datastructure', name: '자료구조', type: 'concept' },
  { id: 'designpattern', name: '디자인 패턴', type: 'concept' },
  { id: 'git', name: 'Git', type: 'concept' },
  { id: 'webpack', name: 'Webpack', type: 'concept' },
  { id: 'vite', name: 'Vite', type: 'concept' },
  { id: 'webapi', name: 'Web API', type: 'concept' },
  { id: 'browser', name: 'Browser', type: 'concept' },
  { id: 'performance', name: 'Performance', type: 'concept' },
];

export const CODE_CATEGORIES = CATEGORIES.filter(cat => cat.type === 'code');
export const CONCEPT_CATEGORIES = CATEGORIES.filter(cat => cat.type === 'concept');
