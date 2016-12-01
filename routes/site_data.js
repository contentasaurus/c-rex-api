var express = require('express');
var router = express.Router();
var db = require('../models/knex');

/* GET home page. */
router
	.get('/', (req, res, next) =>
		db('site_data').then( function(site_data){
			res.send(site_data)
		})
	)
	.post('/', (req, res, next) =>
		db('site_data')
		.insert(req.body)
		.then( function(rows){
			res.status(200).send({
				status: 'success',
				message: 'Site Data inserted'
			})
		}, next).catch(function(err){
			res.status(404).send({
				status: 'failure',
				message: 'Site Data not inserted: ' + err
			})
		})
	)
	.get('/:id', (req, res, next) =>
		db('site_data').where('id', req.params.id)
		.first()
		.then( function(site_data){
			res.send(site_data)
		})
	)
	.put('/:id', (req, res, next) =>
		db('site_data').where('id', req.params.id)
		.update(req.body)
		.then( function(rows){
			res.status(200).send({
				status: 'success',
				message: 'Site Data updated'
			})
		}, next).catch(function(err){
			res.status(404).send({
				status: 'failure',
				message: 'Site Data not updated: ' + err
			})
		})
	)
	.delete('/:id', (req, res, next) =>
		db('site_data').where('id', req.params.id).del()
		.then( function(rows){
			res.status(200).send({
				status: 'success',
				message: 'Site Data deleted'
			})
		}, next).catch(function(err){
			res.status(404).send({
				status: 'failure',
				message: 'Site Data not deleted: ' + err
			})
		})
	);

module.exports = router;
