<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SessionPlayer extends Model
{
    use HasFactory;

    protected $table = 'session_player';
    public $incrementing = true;

    /**
     * @return mixed
     */
    public function player(){
        return $this->belongsTo(Player::class);
    }

    /**
     * @return mixed
     */
    public function session(){
        return $this->belongsTo(Session::class);
    }
}
