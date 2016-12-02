<?php

use \puffin\model\pdo as pdo;

class script extends pdo
{
	protected $table = 'scripts';

	public function get_by_type( $type )
	{
		$type_id = $this->id_by_type($type);

		$sql = "SELECT
					s.name,
					s.html AS content
				FROM
					scripts AS s,
					script_types AS t
				WHERE
					t.id = :type_id
				AND
					s.script_type_id = t.id
				ORDER BY
					s.priority
				DESC";

		$params = [
			':type_id' => $type_id
		];

		return $this->select( $sql, $params );
	}

	private function id_by_type( $type )
	{
		$types_model = new script_type();
		$types = $types_model->read();

		foreach ($types as $key => $value)
		{
			if($value['name'] == $type)
			{
				return $value['id'];
			}
		}

		return false;
	}
}
