export const apiUrl = {
    /////////////////////----post----///////////////////////
    postLogin:"/admin/v1/login",
    postTournaments:"admin/v1/add/tournaments?ass_key=${item.ass_key}",
    postInsertNews:"/admin/v1/insert/news",
    postDetailMatches:"admin/v1/detail_matches?match_key=${item?.match_key}",
    postUpdateMatch:"admin/v1/update/match?match_key=${item.match_key}",
    postPlayer:"admin/v1/association/player/stats?ass_key=icc&player_key=${item.player_key}",
    postPlayerImage:"/admin/v1/playerImage?p_key=${item.player_key}",
    postTeamsImage:"/admin/v1/teams/image?code=${team?.code}",
    postUpdateNotification:"admin/v1/update/notification?id=${id}",
    postSendNotification:"admin/v1/send/notification",
    postPlayerStats:"admin/v1/association/player/stats?ass_key=icc&player_key=${player_key}",
    postDeleteComments:"admin/v1/delete/comments?reel_id=${reel.reel_id}`, data",
    postAddReel:"/admin/v1/add/reel",
    postUpdateComment:"admin/v1/update/comment?reel_id=${parseInt(reelId.reel_id)}&phone=7007083150&comment=${values.comment}&comment_id=${getSingleComments.comment_id}",
    postAddComment:"admin/v1/add/comment?reel_id",
    postDeleteReel:"admin/v1/delete/reel?reel_id=${item}",
    postDeleteComment:"admin/v1/delete/comment?comment_id=${item}",
    postAddMatches:"admin/v1/add/matches?tou_key=${item}",
    postTournamentsStats:"admin/v1/tournaments/stats/${item}",
    postUpdateMatches:"admin/v1/update/tournament/matches?tou_key=${item}",
    postTournamentPoint:"admin/v1/tournament_point?tou_key=${item}",
    postUpdateTournament:"admin/v1/update_tournament?tou_key=${item}",
    postTournamentImage:"/admin/v1/tournamentImage?tou_key=${item?.tou_key}",


    ////////////////////----get----////////////////////////
    getAssociation:"admin/v1/association_list",
    getTournament:"admin/v1/get_tournament_by_assocation?ass_key=${selectedAssociation.value}",
    getMatchByTournament:"admin/v1/getmatchbytournament/${selectedTournament.value}",
    getSubscribe:"admin/v1/subscribe/match/${item.match_key}",
    getMatchTeamPlayer:"admin/v1/match/team/player?match_key=${id}",
    getNewsLimit:"admin/v1/getNews?limit=${pageLimit}&offset=${offset}",
    getAllDevice:"admin/v1/all/device",
    getTeamPlayer:"admin/v1/match/team/player?match_key=icc_wc_2023_final",
    getReelsLimit:"admin/v1/reels?limit=${pageLimit}&offset=${offset}",
    getGetCommentReel:"admin/v1/get/comment?reel_id=${routeData?.reel_id}",
    getMatchByTournamentId:"admin/v1/getmatchbytournament/${id}",
    getFindUser:"admin/v1/findUser",


    ///////////////////---- delete----////////////////////
    deleteAssociation:"admin/v1/delete/association?ass_key=${item.ass_key}",
    deleteNews:"admin/v1/deleteNews?news_id=${item}",


    ///////////////////----put----/////////////////////
    updateUpdateNews:"admin/v1/updateNews/${getSingleNews.news_id}",
    updateShorts:"admin/v1/updateShorts",
    updateDeleteTournaments:"admin/v1/delete/tournaments/${item.tou_key}",
    updateActiveTournaments:"admin/v1/active/tournaments?tou_key=${item.tou_key}&value=${value === true ? 1 : 0}",
    UpdateNews:"admin/v1/updateNews/${getSingleNews?.news_id}",

   
   
}