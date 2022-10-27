export const exampleQase = {
  event_name: 'case.created',
  timestamp: 1650530190,
  payload: {
    id: 1610,
    title: 'Example test case',
    description: 'Description test case',
    preconditions: 'something',
    postconditions: 'something',
    priority: {
      id: 2,
      title: 'Medium',
      icon: 'genderless',
      color: 'medium',
    },
    severity: {
      id: 4,
      title: 'Normal',
      icon: 'genderless',
      color: 'normal',
    },
    behavior: {
      id: 2,
      title: 'Positive',
    },
    type: {
      id: 8,
      title: 'Functional',
    },
    automation: {
      id: 1,
      title: 'To be automated',
    },
    status: {
      id: 0,
      title: 'Actual',
    },
    suite_id: 12,
    milestone_id: null,
    steps: [
      {
        position: 1,
        action: 'simple action',
        expected_result: 'expected result',
        data: 'input data',
        attachments: [],
        shared: false,
      },
    ],
    attachments: [],
    custom_fields: [
      {
        id: 174,
        title: 'Test Number',
        type: 'number',
        value: '1',
      },
    ],
  },
  team_member_id: 40,
  project_code: 'ID',
}
