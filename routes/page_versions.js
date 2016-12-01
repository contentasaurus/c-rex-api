var express = require('express');
var router = express.Router();
var db = require('../models/knex');

/* GET home page. */
router
	.get('/', (req, res, next) =>
		db('page_versions').then( function(page_versions){
			res.send(page_versions)
		})
	)
	.post('/', (req, res, next) =>
		db('page_versions')
		.insert(req.body)
		.then( function(rows){
			res.status(200).send({
				status: 'success',
				message: 'Page version inserted'
			})
		}, next).catch(function(err){
			res.status(404).send({
				status: 'failure',
				message: 'Page version not inserted: ' + err
			})
		})
	)
	.get('/:id', (req, res, next) =>
		db('page_versions').where('id', req.params.id)
		.first()
		.then( function(blog){
			res.send(blog)
		})
	)
	.get('/for-page/:id/', (req, res, next) =>
		db.select(
			'page_versions.*',
			'users.first_name as author_first_name',
			'users.last_name as author_last_name',
			'page_layouts.name as page_layout_name'
		).from('page_versions')
		.leftJoin('users', 'users.id', 'page_versions.author_user_id')
		.leftJoin('page_layouts', 'page_layouts.id', 'page_versions.page_layout_id')
		.where('page_versions.page_id', req.params.id)
		.then( function(page_data){
			res.send(page_data)
		})
	)
	.put('/:id', (req, res, next) =>
		db('page_versions').where('id', req.params.id)
		.update(req.body)
		.then( function(rows){
			res.status(200).send({
				status: 'success',
				message: 'Page version updated'
			})
		}, next).catch(function(err){
			res.status(404).send({
				status: 'failure',
				message: 'Page version not updated: ' + err
			})
		})
	)
	.put('/:id/state/:state', (req, res, next ) =>
		db('page_versions').where('id', req.params.id).update({
			is_publishable: req.params.state
		}).then( function(rows){
			if( rows === 1 ) {
				res.status(200).send({
					status: 'success',
					message: 'Publication state updated'
				})
			} else {
				res.status(404).send({
					status: 'failure',
					message: 'Publication state not changed'
				})
			}
		}, next).catch(function(err){
			res.status(404).send({
				status: 'failure',
				message: 'Publication state not updated: ' + err
			})
		})
	)
	.delete('/:id', (req, res, next) =>
		db('page_versions').where('id', req.params.id).del()
		.then( function(rows){
			res.status(200).send({
				status: 'success',
				message: 'Page version deleted'
			})
		}, next).catch(function(err){
			res.status(404).send({
				status: 'failure',
				message: 'Page version not deleted: ' + err
			})
		})
	);

module.exports = router;
