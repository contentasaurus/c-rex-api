var express = require('express');
var router = express.Router();
var db = require('../models/knex');

/* GET home page. */
router
	.get('/', (req, res, next) =>
		db('blogs').then( function(blogs){
			res.send(blogs)
		})
	)
	.post('/', (req, res, next) =>
		db('blogs')
		.insert(req.body)
		.then( function(rows){
			res.status(200).send({
				status: 'success',
				message: 'Blog post inserted'
			})
		}, next).catch(function(err){
			res.status(404).send({
				status: 'failure',
				message: 'Blog post not inserted: ' + err
			})
		})
	)
	.get('/:id(\\d+)', (req, res, next) =>
		db('blogs').where('id', req.params.id)
		.first()
		.then( function(blog){
			res.send(blog)
		})
	)
	.get('/by-slug/:slug', (req, res, next) =>
		db('blogs').where('slug', req.params.slug)
		.first()
		.then( function(blog){
			res.send(blog)
		}, next)
	)
	.head('/check-for-slug/:slug', (req, res, next) =>
		db('blogs').where('slug', req.params.slug)
		.then( function(blog){
			if( blog.length === 0 || blog.length == 'undefined' ){
				res.sendStatus(404);
			} else {
				res.sendStatus(200);
			}
		}, next).catch(function(err){
			res.status(404).send({
				status: 'failure',
				message: 'error: ' + err
			})
		})
	)
	.get('/after-date/:date', (req, res, next) =>
		db('blogs').where('publication_date', '>=', req.params.date)
		.then( function(blog){
			res.send(blog)
		}, next)
	)
	.get('/before-date/:date', (req, res, next) =>
		db('blogs').where('publication_date', '<=', req.params.date)
		.then( function(blog){
			res.send(blog)
		}, next)
	)
	.get('/between-dates/:start_date/and/:end_date', (req, res, next) =>
		db('blogs').whereBetween('publication_date', [req.params.start_date, req.params.end_date])
		.then( function(blog){
			res.send(blog)
		}, next)
	)
	.get('/is-publishable', (req, res, next) =>
		db('blogs').where('is_publishable', 1)
		.then( function(blogs){
			res.send(blogs)
		}, next)
	)
	.get('/is-not-publishable', (req, res, next) =>
		db('blogs').where('is_publishable', 0)
		.then( function(blogs){
			res.send(blogs)
		}, next)
	)
	.put('/:id(\\d+)', (req, res, next) =>
		db('blogs').where('id', req.params.id)
		.update(req.body)
		.then( function(rows){
			res.status(200).send({
				status: 'success',
				message: 'Blog post updated'
			})
		}, next).catch(function(err){
			res.status(404).send({
				status: 'failure',
				message: 'Blog post not updated: ' + err
			})
		})
	)
	.put('/:id(\\d+)/state/:state(\\d+)', (req, res, next ) =>
		db('blogs').where('id', req.params.id).update({
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
	.delete('/:id(\\d+)', (req, res, next) =>
		db('blogs').where('id', req.params.id).del()
		.then( function(rows){
			res.status(200).send({
				status: 'success',
				message: 'Blog post deleted'
			})
		}, next).catch(function(err){
			res.status(404).send({
				status: 'failure',
				message: 'Blog post not deleted: ' + err
			})
		})
	);

module.exports = router;
