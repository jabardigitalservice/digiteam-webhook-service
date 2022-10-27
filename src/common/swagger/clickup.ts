export const exampleClickupEventTaskStatusUpdate = {
  event: 'taskStatusUpdated',
  history_items: [
    {
      id: '2800787326392370170',
      type: 1,
      date: '1642736073330',
      field: 'status',
      parent_id: '162641062',
      data: {
        status_type: 'custom',
      },
      source: null,
      user: {
        id: 183,
        username: 'John',
        email: 'john@company.com',
        color: '#7b68ee',
        initials: 'J',
        profilePicture: null,
      },
      before: {
        status: 'to do',
        color: '#f9d900',
        orderindex: 0,
        type: 'open',
      },
      after: {
        status: 'in progress',
        color: '#7C4DFF',
        orderindex: 1,
        type: 'custom',
      },
    },
  ],
  task_id: '1vj38vv',
  webhook_id: '7fa3ec74-69a8-4530-a251-8a13730bd204',
}

export const exampleClickupEventTaskCommentPosted = {
  type: 'object',
  example: {
    event: 'taskCommentPosted',
    history_items: [
      {
        id: '2800803631413624919',
        type: 1,
        date: '1642737045116',
        field: 'comment',
        parent_id: '162641285',
        data: {},
        source: null,
        user: {
          id: 183,
          username: 'John',
          email: 'john@company.com',
          color: '#7b68ee',
          initials: 'J',
          profilePicture: null,
        },
        before: null,
        after: '648893191',
        comment: {
          id: '648893191',
          date: '1642737045116',
          parent: '1vj38vv',
          type: 1,
          comment: [
            {
              text: 'comment abc1234',
              attributes: {},
            },
            {
              text: '\n',
              attributes: {
                'block-id': 'block-4c8fe54f-7bff-4b7b-92a2-9142068983ea',
              },
            },
          ],
          text_content: 'comment abc1234\n',
          x: null,
          y: null,
          image_y: null,
          image_x: null,
          page: null,
          comment_number: null,
          page_id: null,
          page_name: null,
          view_id: null,
          view_name: null,
          team: null,
          user: {
            id: 183,
            username: 'John',
            email: 'john@company.com',
            color: '#7b68ee',
            initials: 'J',
            profilePicture: null,
          },
          new_thread_count: 0,
          new_mentioned_thread_count: 0,
          email_attachments: [],
          threaded_users: [],
          threaded_replies: 0,
          threaded_assignees: 0,
          threaded_assignees_members: [],
          threaded_unresolved_count: 0,
          thread_followers: [
            {
              id: 183,
              username: 'John',
              email: 'john@company.com',
              color: '#7b68ee',
              initials: 'J',
              profilePicture: null,
            },
          ],
          group_thread_followers: [],
          reactions: [],
          emails: [],
        },
      },
    ],
    task_id: '1vj38vv',
    webhook_id: '7fa3ec74-69a8-4530-a251-8a13730bd204',
  },
}
