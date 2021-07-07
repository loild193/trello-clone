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
							cover: "https://scontent-sin6-2.xx.fbcdn.net/v/t1.6435-9/71113331_774151313037297_802618414257405952_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=730e14&_nc_ohc=z_9oS44YTjgAX_fXgNh&_nc_ht=scontent-sin6-2.xx&oh=abb3f8343e6f1b9f4bb1e8eecdba9f2d&oe=60EA94E5", 
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