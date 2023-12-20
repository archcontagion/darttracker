<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Score extends Model
{
    use HasFactory;

     /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'round_number',
        'set_number',
        'leg_number', 
        'throw_number',
        'throw_score',
        'score_id',
        'session_id',
        'player_id',
    ];

}
