/**
 * @author        Ronald Marske <ronaldmarske@yaoo.de>
 * @filesource    Resources/JavaScript/Collection.js
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
var Collection = new Class({

	/**
	 * contains collection data
	 */
	data: [],

	/**
	 * contains max id
	 */
	maxId: 1,

	/**
	 * name of collection object
	 */
	name: null,

	/**
	 * is strage object
	 */
	bStorage: false,

	/**
	 * local storage object
	 */
	storage: null,

//pragma mark - initialisation

	/**
	 * initialisation method, loads data from local storage if
	 * {bStorage} is true
	 *
	 * @param string  sName    current name of collection
	 * @param boolean bStorage use local storage for this
	 */
	initialize: function(sName, bStorage) {

		if(undefined == sName) {
			throw "Collection need a name to handle it";
		}

		// set name of collection
		this.name = sName;

		// if storage enabled
		if (true == bStorage) {

			this.bStorage = true;

			// init storage object
			this.storage = new LocalStorage();

			// laod
			this.load();
		}

	},

//pragma mark - modifications

	/**
	 * add an item to this collection
	 *
	 * @param Object  oItem    item to add
	 * @param boolean onTop    add on top or at the end
	 */
	add: function(oItem, onTop) {
		// if no value for onTop - set false
		if (undefined == onTop) {
			onTop = false;
		}

		// add id to item
		oItem.id = this.maxId;

		// add item
		if (true == onTop) {
			this.data.unshift(oItem);
		} else {
			this.data.push(oItem);
		}

		// increment id
		this.maxId += 1;
	},

	/**
	 * remove an element by id
	 * @param integer id
	 */
	deleteById: function(id) {
		for(var i = 0; i < this.data.length; i++) {
			if (this.data[i].id == id) {
				this.data.erase(this.data[i]);
			}
		}
	},

// pragma mark - get methods

	/**
	 * return object from collection by id
	 * @param integer id
	 * @return Object
	 */
	getById: function(id) {
		for(var i = 0; i < this.data.length; i++) {
			if (this.data[i].id == id) {
				return this.data[i];
			}
		}

		return null;
	},

//pragma mark - transformations

	/**
	 * return clean array for iterations
	 *
	 * @return array
	 */
	toArray: function() {

		return this.data.clone();
	},

//pragma mark - Storage

	/**
	 * load current collection from local storage
	 */
	load: function() {

		// load data from storage
		if (true == this.bStorage) {
			this.data = this.storage.get(this.name);
		}

		// if local storage is empty - set empty array
		if (null == this.data) {
			this.data = [];
		}

		this.maxId = 0;

		// iterate all objects and create class instances
		for(var i = 0; i < this.data.length; i++) {
			var data = this.data[i];

			if (data.__class) {

				var oClass = new window[data.__class]();
				Object.each(data, function(value, key) {
					oClass[key] = value;
				});

				oClass.__fromJson(data);

				this.data[i] = oClass;

				// max ID
				if (this.maxId < oClass.id) {
					this.maxId = oClass.id;
				}
			}

		}

		this.maxId += 1;
	},

	/**
	 * save current collection to local Storage
	 */
	save: function() {

		if (true == this.bStorage) {
			// save tournaments
			this.storage.set(this.name, this.data);
		}
	}
});