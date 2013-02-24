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

// global defenitions
Locale.define(locale, 'default', {
	'title': 'Utlimate Spirit Analytics',
	'edit': 'Edit',
	'delete': 'Delete',
	'back': 'back',
	'pleaseChoose': 'Please choose',
	'cancel': 'Cancel',
	'save': 'Save'
});

// definitions for Dashboard
Locale.define(locale, 'Dashboard', {
	'title': 'Tournaments',
	'noResult': 'There is no tournament created - please add a tournament using the button on the right side',
	'addTournament': 'Add Tournament',
	'deleteConfirm': 'Do you really want to delete this tournament including all analysis?'
});

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