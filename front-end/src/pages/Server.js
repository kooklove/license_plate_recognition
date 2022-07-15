/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { filter } from 'lodash';
import { useEffect, useState } from 'react';

// material
import {
	Avatar, Card, Checkbox, Container, Stack, Table, TableBody,
	TableCell, TableContainer,
	TablePagination, TableRow, Typography
} from '@mui/material';
// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
// mock

const USER_LIST = [
	{
		"id": "user1",
		"numTotalQuery": 1,
		"numExactMatch": 0,
		"numPartialMatch": 1,
		"numNoMatch": 0
	},
	{
		"id": "user3",
		"numTotalQuery": 2,
		"numExactMatch": 0,
		"numPartialMatch": 1,
		"numNoMatch": 1
	},
	{
		"id": "user2",
		"numTotalQuery": 1,
		"numExactMatch": 1,
		"numPartialMatch": 0,
		"numNoMatch": 0
	},
	{
		"id": "user4",
		"numTotalQuery": 1,
		"numExactMatch": 1,
		"numPartialMatch": 0,
		"numNoMatch": 0
	}
]


// ----------------------------------------------------------------------

const TABLE_HEAD = [
	{ id: 'id', label: 'User ID', alignRight: false },
	{ id: 'numTotalQuery', label: '#Queries', alignRight: false },
	{ id: 'numExactMatch', label: '#Exact natch', alignRight: false },
	{ id: 'numPartialMatch', label: '#Partial match', alignRight: false },
	{ id: 'numNoMatch', label: '#No match', alignRight: false },
	{ id: '' },
];


// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator(order, orderBy) {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	if (query) {
		return filter(array, (_user) => _user.id.toLowerCase().indexOf(query.toLowerCase()) !== -1);
	}
	return stabilizedThis.map((el) => el[0]);
}

export default function Server() {
	const [userlist, setUserlist] = useState(undefined);
	const [page, setPage] = useState(0);
	const [order, setOrder] = useState('asc');
	const [selected, setSelected] = useState([]);
	const [orderBy, setOrderBy] = useState('name');
	const [filterName, setFilterName] = useState('');
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const [emptyRows, setEmptyRows] = useState(0);
	const [filteredUsers, setFilteredUsers] = useState(undefined);
	const [isUserNotFound, setIsUserNotFound] = useState(false);

	useEffect(() => {
		requestToPerformanceMetric();
	}, []);

	useEffect(() => {
		const refresh = () => {
			setEmptyRows(page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userlist.length) : 0);
			const filtered = applySortFilter(userlist, getComparator(order, orderBy), filterName);
			setFilteredUsers(filtered);
			setIsUserNotFound(filtered.length === 0);
		}
		if (userlist) {
			refresh();
		}
	}, [userlist]);

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelecteds = userlist.map((n) => n.id);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	};

	const handleClick = (event, name) => {
		const selectedIndex = selected.indexOf(name);
		let newSelected = [];
		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, name);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
		}
		setSelected(newSelected);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleFilterByName = (event) => {
		setFilterName(event.target.value);
	};

	const requestToPerformanceMetric = async () => {
		console.log("requestToPerformanceMetric");
		axios
			// .get('https://10.58.2.34:3503/performance')
			.get('https://10.58.2.34:3503/performance')
			// .get('https://localhost:3503/performance')
			.then(response => {
				console.log(response);
				setUserlist(USER_LIST);
			})
			.catch(err => {
				console.log('err', err);
			});
	}

	return (<>
		{userlist &&
			<Page title="Server">

				<Container>
					<Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
						<Typography variant="h4" gutterBottom>
							Performance Metric
						</Typography>
					</Stack>

					<Card>
						<UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

						<Scrollbar>

							<TableContainer sx={{ minWidth: 800 }}>
								<Table>
									<UserListHead
										order={order}
										orderBy={orderBy}
										headLabel={TABLE_HEAD}
										rowCount={userlist.length}
										numSelected={selected.length}
										onRequestSort={handleRequestSort}
										onSelectAllClick={handleSelectAllClick}
									/>
									<TableBody>
										{filteredUsers && filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
											const { id, numTotalQuery, numExactMatch, numPartialMatch, numNoMatch } = row;
											const isItemSelected = selected.indexOf(id) !== -1;

											return (
												<TableRow
													hover
													key={id}
													tabIndex={-1}
													role="checkbox"
													selected={isItemSelected}
													aria-checked={isItemSelected}
												>
													<TableCell padding="checkbox">
														<Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, id)} />
													</TableCell>
													<TableCell component="th" scope="row" padding="none">
														<Stack direction="row" alignItems="center" spacing={2}>
															<Avatar alt={id} src={`/static/mock-images/avatars/avatar_${index + 1}.jpg`} />
															<Typography variant="subtitle2" noWrap>
																{id}
															</Typography>
														</Stack>
													</TableCell>
													<TableCell align="left">{numTotalQuery}</TableCell>
													<TableCell align="left">{numExactMatch}</TableCell>
													<TableCell align="left">{numPartialMatch}</TableCell>
													<TableCell align="left">{numNoMatch}</TableCell>
													<TableCell align="right">
														<UserMoreMenu />
													</TableCell>
												</TableRow>
											);
										})}
										{emptyRows > 0 && (
											<TableRow style={{ height: 53 * emptyRows }}>
												<TableCell colSpan={6} />
											</TableRow>
										)}
									</TableBody>

									{isUserNotFound && (
										<TableBody>
											<TableRow>
												<TableCell align="center" colSpan={6} sx={{ py: 3 }}>
													<SearchNotFound searchQuery={filterName} />
												</TableCell>
											</TableRow>
										</TableBody>
									)}
								</Table>
							</TableContainer>
						</Scrollbar>

						<TablePagination
							rowsPerPageOptions={[5, 10, 25]}
							component="div"
							count={userlist.length}
							rowsPerPage={rowsPerPage}
							page={page}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
						/>
					</Card>
				</Container>
			</Page>
		}
	</>);
}
