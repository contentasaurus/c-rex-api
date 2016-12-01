var express = require('express');
var router = express.Router();
var db = require('../models/knex');

/* GET home page. */
router
	.get('/', (req, res, next) =>
		db('users').then( function(users){
			res.send(users)
		})
	)
	.post('/', (req, res, next) =>

		// if( req.body.password === req.body.confirm_password )
		// {
		// 	delete req.body.confirm_password;
		// 	//then hash the password in some way?
		// }

		db('users')
		.insert(req.body)
		.then( function(rows){
			res.status(200).send({
				status: 'success',
				message: 'User inserted'
			})
		}, next).catch(function(err){
			res.status(404).send({
				status: 'failure',
				message: 'User not inserted: ' + err
			})
		})
	)
	.get('/:id', (req, res, next) =>
		db('users').where('id', req.params.id)
		.first()
		.then( function(users){
			res.send(users)
		})
	)
	.put('/:id', (req, res, next) =>
		db('users').where('id', req.params.id)
		.update(req.body)
		.then( function(rows){
			res.status(200).send({
				status: 'success',
				message: 'User updated'
			})
		}, next).catch(function(err){
			res.status(404).send({
				status: 'failure',
				message: 'User not updated: ' + err
			})
		})
	)
	.put('/:id/state/:state', (req, res, next ) =>
		db('users').where('id', req.params.id).update({
			is_active: req.params.state
		}).then( function(rows){
			if( rows === 1 ) {
				res.status(200).send({
					status: 'success',
					message: 'User state updated'
				})
			} else {
				res.status(404).send({
					status: 'failure',
					message: 'User state not changed'
				})
			}
		}, next).catch(function(err){
			res.status(404).send({
				status: 'failure',
				message: 'User state not updated: ' + err
			})
		})
	)
	.delete('/:id', (req, res, next) =>
		db('users').where('id', req.params.id).del()
		.then( function(rows){
			res.status(200).send({
				status: 'success',
				message: 'User deleted'
			})
		}, next).catch(function(err){
			res.status(404).send({
				status: 'failure',
				message: 'User not deleted: ' + err
			})
		})
	);

module.exports = router;
