/**
 * @author        Ronald Marske <ronaldmarske@yaoo.de>
 * @filesource    Resources/Languages/en-us.js
 *
 * @copyright     Copyright (c) 2012 Ronald Marske, All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in
 *       the documentation and/or other materials provided with the
 *       distribution.
 *
 *     * Neither the name of Ronald Marske nor the names of his
 *       contributors may be used to endorse or promote products derived
 *       from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
 * FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 * COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
 * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
 * LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

var locale = 'en-US';

// global translation
Locale.define(locale, 'default', {
	'title': 'Utlimate Spirit Analytics',
	'edit': 'Edit',
	'delete': 'Delete',
	'back': 'back',
	'pleaseChoose': 'Please choose',
	'cancel': 'Cancel',
	'save': 'Save',
	'yes': 'Yes'
});

// Dashboard translations
Locale.define(locale, 'Dashboard', {
	'title': 'Tournaments',
	'noResult': 'There is no tournament created - please add a tournament using the button on the right side',
	'addTournament': 'Add Tournament',
	'deleteConfirm': 'Do you really want to delete this tournament including all analysis?'
});

// Tournament translations
Locale.define(locale, 'Tournament', {
	'addTeam': 'Add Team',
	'changeTournamentName': 'To change this tournament name use double click.',
	'matches': 'Matches',
	'rules': 'Rules Knowledge',
	'fouls': 'Fouls and Contact',
	'fair': 'Fair-Mindedness',
	'attitude': 'Positive Attitude',
	'spirit': 'Our Spirit',
	'average': 'Average',
	'noResult': 'There is no team created yet. Please add a team.',
	'deleteConfirm': 'Do you really want to delete this team including all analysis?',
	'addSpiritDescription': 'Click to add a new spirit result for a game.',
	'showMatchesDesc': 'Click to show all games by this team',
	'createResult': 'Create result',
	'deleteResultConfirm': 'Do You really want to delete this result?'
});

// Setting translations
Locale.define(locale, 'Setting', {
	'title': 'Settings',
	'globalHeader': 'Globale Settings',
	'language': 'Language',
	'update': 'Search for updates automaticly',
	'de-DE': 'German',
	'en-US': 'English (US)'
});


// definitions of Spirit sheet
Locale.define(locale, 'Spirit', {
	'title': 'Spirit of the Game Score Sheet',
	'spiritDescription': 'Spirit of the Game is a fundamental part of (Beach) Ultimate. With this in mind the sheet was designed to educate teams in SOTG and help teams achieve a better understanding of their strengths and weaknesses in terms of Spirit.',
	'fillOutInstructions': 'Your whole team should be involved in rating the other team! Simply circle one box in each of the five lines and sum up the points to determine the Spirit score for the other team.',
	'fromTeam': 'Our team name',
	'toTeam': 'Their team name',
	'day': 'Tag',
	'points': [
		{'points': 0, 'desc': '0 Points'},
		{'points': 1, 'desc': '1 Point each'},
		{'points': 2, 'desc': '2 Point each'},
		{'points': 3, 'desc': '3 Point each'},
		{'points': 4, 'desc': '4 Point each'},
	],
	'categories': [
		{'category': 'rules', 'title': 'Rules Knowledge and Use', 'desc': 'For example: They did not make unjustified calls. They did not purposefully misinterpret the rules. They kept to time limits. They were willing to teach and/or learn the rules'},
		{'category': 'fouls', 'title': 'Fouls and Body Contact', 'desc': 'For example: They avoided fouling, contact, and dangerous plays'},
		{'category': 'fair', 'title': 'Fair-Mindedness', 'desc': 'For example: They apologized for their own fouls. They informed teammates when they made wrong or unnecessary calls. They were willing to admit that we were right and retracted their call'},
		{'category': 'attitude', 'title': 'Positive Attitude and Self-Control', 'desc': 'For example: They introduced themselves. They communicated without derogatory or aggressive language. They complimented us on our good plays. They left an overall positive impression during and after the game, e.g. during the Spirit circle'},
		{'category': 'spirit', 'title': 'Our Spirit compared to theirs', 'desc': 'How did our team compare to theirs with regards to rules knowledge, body contact, fair-mindedness, positive attitude and self-control?'}
	]

});

// Update Check
Locale.define(locale, 'Update', {
	'title': 'A new version of Ultimate Spirit Offline App is available!',
	'desc': 'Ultimate Spirit Offline App %version% ist now available - you have %oldVersion%. Would you like to download it now?',
	'download': 'Download',
	'skip': 'Skip this version',
	'remindMeLater': 'Remind me later'
});