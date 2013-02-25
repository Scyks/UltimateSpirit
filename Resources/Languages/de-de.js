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
	'en-US': 'English (US)'
});

// definitions of Spirit sheet
Locale.define(locale, 'Spirit', {
	'title': 'Spirit of the Game-Bewertungsbogen',
	'spiritDescription': 'Spirit of the Game ist ein fundamentaler Bestandteil des Sportes (Beach) Ultimate. Eingedenk dessen wurde der Bogen gestaltet, um die Teams im SOTG zu unterrichten und um ihnen zu helfen, ein besseres Verständnis ihrer Stärken und Schwächen hinsichtlich des Spirits zu erlangen.',
	'fillOutInstructions': 'Dein ganzes Team sollte daran beteiligt sein, das andere Team zu bewerten. Kreise einfach je ein Feld in jeder der fünf Zeilen ein und addiere die Punkte, um den Spiritwert für das andere Team zu ermitteln.',
	'fromTeam': 'Unser Teamname',
	'toTeam': 'Ihr Teamname',
	'day': 'Tag',
	'points': [
		{'points': 0, 'desc': '0 Punkte'},
		{'points': 1, 'desc': 'je 1 Punkt'},
		{'points': 2, 'desc': 'je 2 Punkte'},
		{'points': 3, 'desc': 'je 3 Punkte'},
		{'points': 4, 'desc': 'je 4 Punkte'},
	],
	'categories': [
		{'category': 'rules', 'title': 'Regelkenntnis und –gebrauch', 'desc': 'Zum Beispiel: Sie haben keine unangemessenen oder ungerecht- fertigten Calls gemacht. Sie haben die Regeln nicht absichtlich misinterpretiert. Sie hielten sich an die Zeitlimits. Sie waren bereit, die Regeln zu erklären und/oder sich erklären zu lassen.'},
		{'category': 'fouls', 'title': 'Fouls und Körperkontakt', 'desc': 'Zum Beispiel: Sie vermieden Fouls, Körperkontakt und gefähr- liche Spielweisen.'},
		{'category': 'fair', 'title': 'Aufrichtigkeit und Fairplay', 'desc': 'Zum Beispiel: Sie entschuldigten sich für begangene Fouls. Sie korrigierten Mitspieler, wenn diese falsche oder unnötige Calls machten. Sie waren bereit zuzugeben, dass wir Recht hatten und zogen ihren Call zurück.'},
		{'category': 'attitude', 'title': 'Positive Einstellung und Selbstbeherrschung', 'desc': 'Zum Beispiel: Sie stellten sich vor. Sie kommunizierten ohne abfällige oder aggressive Sprache. Sie beglückwünschten uns zu gelungenen Spielaktionen. Sie hinterließen einen positiven Eindruck während und nach dem Spiel, etwa im Spirit Circle.'},
		{'category': 'spirit', 'title': 'Unser Spirit verglichen mit ihrem', 'desc': 'Wie schneidet unser Team verglichen mit ihrem ab in Hinblick auf Regelkenntnis, Körperkontakt, Aufrichtigkeit und Fairplay, Positive Einstellung und Selbstbeherrschung?'}
	]

});