<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Session extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'winner_id',
        'winners_stats',
        'session_state',
        'is_active',
        'start_time',
        'end_time',
    ];

    public function players()
    {
        return $this->belongsToMany(Player::class)->withPivot(['player_id','session_id','score_id']);
    }

    public function player()
    {
        return $this->belongsTo(Player::class)->withPivot(['player_id','session_id','score_id']);
    }


}
