/**
 * @author        Ronald Marske <ronaldmarske@yaoo.de>
 * @filesource    Resources/JavaScript/Models/Setting.js
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
var Models_Setting = new Class({

	__class: 'Models_Setting',
	/**
	 * id
	 * @var integer
	 */
	id: null,

	/**
	 * language
	 * @var integer
	 */
	language: 'en-US',

	/**
	 * updates
	 * @var integer
	 */
	update: true,


	/**
	 * initialize Setting Model
	 * @param string sName
	 */
	initialize: function() {

		this.__class = 'Models_Setting';


	},

	/**
	 * loads data from local storage
	 * @return {*}
	 */
	load: function() {

		// init storage object
		var oStorage = new LocalStorage();

		var oData = oStorage.get(this.__class);


		// if local storage is empty - set empty array
		if (null == oData) {
			return this;
		}

		// iterate all objects and create class instances
		Object.each(oData, function(value, key) {
			this[key] = value;
		}.bind(this));

		this.__fromJson(oData);

		return this;
	},

	/**
	 * save current collection to local Storage
	 */
	save: function() {

		// init storage object
		var oStorage = new LocalStorage();

		// save tournaments
		oStorage.set(this.__class, this);

	},

	__fromJson: function(data) {

	}
});