export const initData = {
	boards: [
		{
			id: 'board-1',
			columnOrder: ['column-1', 'column-2', 'column-3'],
			columns: [
				{
					id: 'column-1',
					boardId: 'board-1',
					title: 'To do column-1',
					cardOrder: ['card-1', 'card-2', 'card-3', 'card-4', 'card-5', 'card-6', 'card-7', 'card-8', 'card-9'],
					cards: [
						{ 
							id: 'card-1', 
							boardId: 'board-1',
							columnId: 'column-1', 
							title: 'Title card 1', 
							cover: "https://scontent-hkg4-1.xx.fbcdn.net/v/t1.6435-9/s1080x2048/155187045_1176505132801911_4373353207752044211_n.jpg?_nc_cat=102&ccb=1-3&_nc_sid=a4a2d7&_nc_ohc=NQ_Q-7E6rBgAX_QVmdm&_nc_ht=scontent-hkg4-1.xx&tp=7&oh=0066cdbd152dc2a4a2753d2a061ebd20&oe=60D40BB9", 
						},
						{ id: 'card-2', boardId: 'board-1', columnId: 'column-1', title: 'Title card 2', cover: null },
						{ id: 'card-3', boardId: 'board-1', columnId: 'column-1', title: 'Title card 3', cover: null },
						{ id: 'card-4', boardId: 'board-1', columnId: 'column-1', title: 'Title card 4', cover: null },
						{ id: 'card-5', boardId: 'board-1', columnId: 'column-1', title: 'Title card 5', cover: null },
						{ id: 'card-6', boardId: 'board-1', columnId: 'column-1', title: 'Title card 6', cover: null },
						{ id: 'card-7', boardId: 'board-1', columnId: 'column-1', title: 'Title card 7', cover: null },
						{ id: 'card-8', boardId: 'board-1', columnId: 'column-1', title: 'Title card 8', cover: null },
						{ id: 'card-9', boardId: 'board-1', columnId: 'column-1', title: 'Title card 9', cover: null },
					],
				},
				{
					id: 'column-2',
					boardId: 'board-1',
					title: 'Love column-2',
					cardOrder: ['card-13', 'card-14'],
					cards: [
						{ id: 'card-13', boardId: 'board-1', columnId: 'column-1', title: 'Title card 13', cover: null },
						{ id: 'card-14', boardId: 'board-1', columnId: 'column-1', title: 'Title card 14', cover: null },
					],
				},
				{
					id: 'column-3',
					boardId: 'board-1',
					title: 'Live for column-3',
					cardOrder: ['card-10', 'card-11', 'card-12'],
					cards: [
						{ id: 'card-10', boardId: 'board-1', columnId: 'column-1', title: 'Title card 10', cover: null },
						{ id: 'card-11', boardId: 'board-1', columnId: 'column-1', title: 'Title card 11', cover: null },
						{ id: 'card-12', boardId: 'board-1', columnId: 'column-1', title: 'Title card 12', cover: null },
					],
				},
			],
		}
	]
};