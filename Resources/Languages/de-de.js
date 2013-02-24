/**
 * @author        Ronald Marske <ronaldmarske@yaoo.de>
 * @filesource    Resources/Languages/de-de.js
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

var locale = 'de-DE';

// global translation
Locale.define(locale, 'default', {
	'title': 'Utlimate Spirit Auswertung',
	'edit': 'Bearbeiten',
	'delete': 'Löschen',
	'back': 'Zurück',
	'pleaseChoose': 'Bitte auswählen',
	'cancel': 'Abbechen',
	'save': 'Speichern',
	'yes': 'Ja'
});

// Dashboard translations
Locale.define(locale, 'Dashboard', {
	'title': 'Turniere',
	'noResult': 'Bisher wurde kein Turnier angelegt. Du kannst über den Button "Turnier anlegen" auf der rechten Seite ein Turnier anlegen',
	'addTournament': 'Turnier hinzufügen',
	'deleteConfirm': 'Willst du dieses Turnier und alle Statistiken wirklich löschen?'
});

// Tournament translations
Locale.define(locale, 'Tournament', {
	'addTeam': 'Team hinzufügen',
	'changeTournamentName': 'Zum Ändern des Tunrniernamens kannst du einfach Doppelklicken',
	'matches': 'Spiele',
	'rules': 'Regelkenntnis',
	'fouls': 'Fouls und Kontact',
	'fair': 'Fairplay',
	'attitude': 'Positive Einstellung',
	'spirit': 'Unser Spirit',
	'average': 'Durchschnitt',
	'noResult': 'Es wurde bisher kein Team angelegt. Bitte lege eins an.',
	'deleteConfirm': 'Willst du das Team inklusive der Statistik wirklich löschen?',
	'addSpiritDescription': 'Über diese Aktion kannst du ein neues Spirit Ergebnis hinzufügen.',
	'showMatchesDesc': 'Über diese Aktion kannst du dir alle Spiele des Teams anzeigen lassen',
	'createResult': 'Ergebnis anlegen',
	'deleteResultConfirm': 'Willst du das Ergebnis wirklich löschen?'
});

// Setting translations
Locale.define(locale, 'Setting', {
	'title': 'Einstellungen',
	'globalHeader': 'Globale Einstellungen',
	'language': 'Sprache',
	'update': 'Automatisch nach Updates suchen',
	'de-DE': 'Deutsch',
	'en-US': 'English (US)',
});